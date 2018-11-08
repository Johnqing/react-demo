import ajax from '../../public/libs/ajax';

export default function Auth(state = [], action){
    return ajax({
        url: '/auth',
    })
    .then((res)=>{
        return {
            10: 1
        }
    })
}