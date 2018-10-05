{
    let view = {
        el: '.page > main >.maincontent',
        template: `
            <form class="form">
                <div class="row">
                    <label>歌名</label>
                    <input type="text">
                </div>
                <div class="row">
                    <label>歌手</label>
                    <input type="text">
                </div>
                <div class="row">
                    <label>外链</label>
                    <input type="text">
                </div>
                <div class="row actions">
                    <button type="submit">保存</button>
                </div>
            </form>
        `,
        render(data){
            $(this.el).html(this.template)
        }
    }
    let model = {}
    let controller = {
        init(view,model){
            this.view = view
            this.model = model
            this.view.render(this.model.data)
            window.eventHub.on('upload',(data)=>{
                console.log("songForm:"+data)
            })
        }
    }
    controller.init(view,model)
}