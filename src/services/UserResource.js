export default function UserResource(Vue){
    return Vue.$resource('/users{/id}');
}