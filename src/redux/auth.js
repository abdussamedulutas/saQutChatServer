const INITIAL_VALUES = {
    user: {},
    loginned: false
};

export default function AuthRedux(state = INITIAL_VALUES, {type,payload})
{
    switch(type)
    {
        case "auth/user/signin":{
            return {
                ...state,
                user: payload,
                loginned: true
            }
        }
        default: return state;
    };
}