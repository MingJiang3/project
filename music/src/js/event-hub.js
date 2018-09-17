window.evnetHub = {
    evnets: {
        
    },
    emit(eventName, data) {            //发布
        for (let key in this.evnets) {
            if (key === eventName) {
                let fnList = this.evnets[key]
                fnList.map((fn) => {
                    fn.call(undefined, data)
                })
            }
        }
    },
    on(eventName, fn) {               //订阅
        if (this.evnets[eventName] === undefined) {
            this.evnets[eventName] = []
        }
        this.evnets[eventName].push(fn)
    }
}