import axios from 'axios'

function fetch(url,data){
    return new Promise((resolve,reject)=>{
        axios.post(url,data).then(res => {
            let status = res.data.status
            // 正常情况应该这样写，因为模拟数据所以省略
            // if(status === 200){
            //     resolve(res)
            // }if(status === 300){
            //     resolve(res)
            // }
            // reject(res)
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
    })
}
export default fetch


