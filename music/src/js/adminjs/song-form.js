{
    let view = {
        el: '.page > main >.maincontent',
        init() { this.$el = $(this.el) },
        template: `
            <form class="form">
                <div class="row">
                    <label>歌名</label>
                    <input type="text" value="__name__" name="name">
                </div>
                <div class="row">
                    <label>歌手</label>
                    <input type="text" value="__singer__" name="singer">
                </div>
                <div class="row">
                    <label>外链</label>
                    <input type="text" value="__url__" name="url">
                </div>
                <div class="row">
                    <label>封面</label>
                    <input type="text" value="__cover__" name="cover">
                </div>
                <div class="row">
                    <label>歌词</label>
                    <textarea name="lyrics" cols=39 rows=5>__lyrics__</textarea>
                </div>
                <div class="row actions">
                    <button type="submit">保存</button>
                </div>
            </form>
        `,
        render(data = {}) {
            let placeholders = ['name', 'url', 'singer', 'id' ,'cover', 'lyrics']
            let html = this.template
            placeholders.map((string) => {
                html = html.replace(`__${string}__`, data[string] || '')
            })
            $(this.el).html(html)
        },
        reset() {
            this.render({})
        }
    }
    let model = {
        data: { name: '', singer: '', url: '', id: '' ,cover:'' ,lyrics:''},
        updata(data){
            var song = AV.Object.createWithoutData('Song', this.data.id)
            song.set('name', data.name)
            song.set('singer', data.singer)
            song.set('url', data.url)
            song.set('cover', data.cover)
            song.set('lyrics', data.lyrics)
            return song.save().then((response)=>{
                Object.assign(thsi.data , data)
                return response
            })
        },
        create(data) {
            var Song = AV.Object.extend('Song');
            var song = new Song()
            song.set('name', data.name)
            song.set('singer', data.singer)
            song.set('url', data.url)
            song.set('cover', data.cover)
            song.set('lyrics', data.lyrics)
            return song.save().then((newSong) => {
                let { id, attributes } = newSong    // let id = newSong.id     // let attributes = newSong.attributes
                // this.data = {id, ...attributes}
                Object.assign(this.data, {
                    id,                                   //this.data.id = id
                    ...attributes                         //相当于下面三行
                    //name:attributes.name,               //this.data.name = attributes.name
                    //singer:attributes.singer,           //this.data.singer = attributes.singer
                    //url:attributes.url
                })
            }, (error) => {
                console.error(error);
            });
        } 
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.view.init()
            this.model = model
            this.view.render(this.model.data)       //这里才把form渲染进来
            this.bindEvents()
            window.eventHub.on('upload', (data) => {
                this.model.data = data
                this.view.render(this.model.data)
            })
            window.eventHub.on('select', (data) => {
                this.model.data = data
                this.view.render(this.model.data)
            })
        },
        create() {
            let needs = 'name singer url cover lyrics'.split(' ')
            let data = {}
            needs.map((string) => {
                data[string] = this.view.$el.find(`[name="${string}"]`).val()
            })
            this.model.create(data).then(() => {
                this.view.reset()
                // let string = JSON.stringify(this.model.data)
                // let obj = JSON.parse(string)
                let obj = JSON.parse(JSON.stringify(this.model.data))   //深拷贝,否则会把同一内存传来传去
                window.eventHub.emit('create', obj)
            })
        },
        updata() {
            let needs = 'name singer url cover lyrics'.split(' ')
            let data = {}
            needs.map((string) => {
                data[string] = this.view.$el.find(`[name="${string}"]`).val()
            })
            this.model.updata(data).then(()=>{
                window.eventHub.emit('updata', JSON.parse(JSON.stringify(this.model.data)))
            })
            
        },
        bindEvents() {
            this.view.$el.on('submit', 'form', (e) => {   //事件委托
                e.preventDefault()
                if (this.model.data.id) {
                    this.updata()
                } else {
                    this.create()
                }
            })
        }
    }
    controller.init(view, model)
}