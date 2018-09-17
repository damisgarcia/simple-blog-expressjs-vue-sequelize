export default function UserResource(Vue){
    return Vue.$resource('/users{/id}', {}, {
        create: { method: 'POST', url: '/users' }
    });
}