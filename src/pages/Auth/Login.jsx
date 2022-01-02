import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Alert, AlertTitle, Button, Card, IconButton, InputAdornment, LinearProgress, Switch, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect ,useState} from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import useForm from "../utils/useForm";

export default function Login({url})
{
    const [showPassword, setShowPassword] = useState(false);
    let form = useForm({
        email:"",
        password:""
    });

    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(false);
    const [success,setSuccess] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const handleShowPassword = () => setShowPassword(e => !e);
    function handleRegister()
    {
        history.push("/register")
    }
    async function handleSubmit()
    {
        form.lock();
        setLoading(true);
        let data;
        try{
            data = await axios.post("/api/v2/auth/login",form.state);
            if(data.data.status == "success")
            {
                setSuccess(data.data.message);
                setError(false);
                dispatch({
                    type:"auth/user/signin",
                    payload: data.data.user
                })
            }else{
                setError(data.data.message);
                setSuccess(false);
            }
        }catch(i){
            setSuccess(false);
            setError(i.response.data.message);
        }
        form.unlock();
        setLoading(false);
    }
    return <>
        <Box m="auto" ml={10}>
            <Card variant="elevation" elevation={3} sx={{width:{md:"25vw"},minHeight:"50vh",display:"flex",flexDirection:"column"}}>
                {loading && <LinearProgress />}
                <Box textAlign="center" mt={3}>
                    <Typography variant="h5">saQut Hesabınıza Giriş Yapın</Typography>
                </Box>
                <Box flex={1}/>
                <Box mb={3} px={2}>
                    <TextField
                        type="text"
                        label="E-Posta Adresiniz"
                        fullWidth
                        {...form.input("email")}
                    />
                </Box>
                <Box mb={3} px={2}>
                    <TextField
                        type={showPassword ? "text" : "password"}
                        label="Şifreniz"
                        fullWidth
                        InputProps={{
                            endAdornment: <>
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleShowPassword}
                                        onMouseDown={handleShowPassword}
                                    >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            </>
                        }}
                        {...form.input("password")}
                    />
                </Box>
                <Box mb={3} px={2} display="flex" flexDirection="row">
                    <Button variant="text" color="warning">Şifremi unuttum</Button>
                    <Button variant="text" sx={{ml:1}}>Misafir Olarak Giriş Yap</Button>
                </Box>
                {error && <Box mb={3} px={2}>
                    <Alert severity="error">
                        <AlertTitle>{error}</AlertTitle>
                    </Alert>
                </Box>}
                {success && <Box mb={3} px={2}>
                    <Alert severity="success">
                        <AlertTitle>{success}</AlertTitle>
                    </Alert>
                </Box>}
                <Box flex={1}/>
                <Box mb={3} px={2} display="flex" flexDirection="row" justifyContent="space-evenly">
                    <Button size="large" variant="contained" color="primary" onClick={handleSubmit}>Giriş Yap</Button>
                    <Button size="large" variant="contained" color="success" onClick={handleRegister}>Kayıt Ol</Button>
                </Box>
            </Card>
        </Box>
    </>;
}