import {OneJio_SignUp,OneJio_SignIn,OneJio_SignOut} from '../../configConstant/config';

export const signUp = (user)=>{
    return fetch(`${OneJio_SignUp}` , {
        method : "POST",
        headers  :{
            Accept  :"application/json",
            "Content-Type"  :"application/json"
        },
        body : JSON.stringify(user)
    })
    .then(response=>{
        return response.json();
    })
    .catch(error=>{
        console.log(error)
    })
}

export const signIn= (user)=>{
    return fetch(`${OneJio_SignIn}` , {
        method : "POST",
        headers  :{
            Accept  :"application/json",
            "Content-Type"  :"application/json"
            
        },
        body : JSON.stringify(user)
    })
    .then(response=>{
        return response.json();
    })
    .catch(error=>{
        console.log(error)
    })
}

export const signout= (next)=>{
    if(typeof window !== "undefined"){
        localStorage.removeItem("token")
        next();
        return fetch(`${OneJio_SignOut}` , {
            method:"GET" , 
        })
        .then(response=>console.log("SignedOut"))
        .catch( err=>console.log(err))
    }
}


export const authenticateUser = (data , next)=>{
    if(typeof window !== "undefined"){
        localStorage.setItem("token" , JSON.stringify(data));
        next();
    }
}

export const isAuthenticated = ()=>{
    if(typeof window == "undefined"){
        return false;
    }

    if(localStorage.getItem("token")){
        return JSON.parse(localStorage.getItem("token"))
    }else{
        return false;
    }
}


