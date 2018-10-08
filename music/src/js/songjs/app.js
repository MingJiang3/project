{
    let view = {
        el: '#app',
        render(data) {
            let { song, status } = data
            $(this.el).css('background-image', `url(${song.cover})`)
            $(this.el).find('img.cover').attr('src', song.cover)
            if ($(this.el).find('audio').attr('src') !== song.url) {
                let audio =  $(this.el).find('audio').attr('src', song.url).get(0) //不重头开始播放
                audio.onended = ()=>{window.eventHub.emit('songEnd')}
            }
            if (status === 'playing') {
                $(this.el).find('.disc-container').addClass('playing')
            } else {
                $(this.el).find('.disc-container').removeClass('playing')
            }
            $(this.el).find('.song-description > h1').text(song.name)
            let {lyrics} = song     
            let array = lyrics.split('\n').map((string)=>{  //把歌词分成一段段p标签
                let p = document.createElement('p')
                p.textContent = string
                $(this.el).find('.lyric > .lines').append(p)
            })
        
        },
        play() {
            $(this.el).find('audio')[0].play()
        },
        pause(){
            $(this.el).find('audio')[0].pause()
         }
    }
    let model = {
        data: {
            song: {
                id: '',
                name: '',
                singer: '',
                url: ''
            },
            status: 'paused'
        },
        get(id) {
            var query = new AV.Query('Song')
            return query.get(id).then((song) => {
                Object.assign(this.data.song, { id: song.id, ...song.attributes })
                return song
            })
        }
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            let id = this.getSongId()
            this.model.get(id).then((data) => {
                this.view.render(this.model.data)
            })
            this.bindEvents()
        },
        bindEvents() {
            $(this.view.el).on('click', '.icon-play', () => {
                this.model.data.status = 'playing'
                this.view.render(this.model.data)
                this.view.play()
            })
            $(this.view.el).on('click', '.icon-pause', () => {
                this.model.data.status = 'paused'
                this.view.render(this.model.data)
                this.view.pause()
            })
            window.eventHub.on('songEnd',()=>{
                this.model.data.status = 'paused'
                this.view.render(this.model.data)
            })
        },
        getSongId() {
            let search = window.location.search         //获取查询参数
            if (search.indexOf('?') === 0) {
                search = search.substring(1)            //从index为1的开始取后面所有
            }

            let array = search.split('&').filter((v => v))    //(v=>v)为过滤，v是真就要，假值不要
            for (let i = 0; i < array.length; i++) {
                let kv = array[i].split('=')
                let key = kv[0]
                let value = kv[1]
                if (key === 'id') {
                    id = value
                    break
                }
            }
            return id
        }
    }
    controller.init(view, model)
}





