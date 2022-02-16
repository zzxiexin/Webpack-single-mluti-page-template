import './index.css'
import('./async').then(res => {
    console.log(res)
})
let msg = `hello webpack`
const a = () => {
    console.log('hello es6!!')
}
a();
console.log(msg);