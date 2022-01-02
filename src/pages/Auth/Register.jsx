import { Visibility, VisibilityOff } from "@mui/icons-material";
import { MobileDatePicker } from "@mui/lab";
import { Alert, AlertTitle, Button, Card, FormControl, IconButton, InputAdornment, InputLabel, LinearProgress, MenuItem, Select, Switch, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect ,useState} from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import useForm from "../utils/useForm";
import moment from "moment";
import axios from "axios";


export default function Login()
{
    let form = useForm({
        name:"",
        surname:"",
        email:"",
        phone:"",
        gender:"",
        dateofbirth: moment().format("MM/DD/yyyy"),
        password:"",
        passwordVerif:""
    });
    const history = useHistory();
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(false);
    const [success,setSuccess] = useState(false);
    async function handleSubmit()
    {
        form.lock();
        setLoading(true);
        let data;
        try{
            data = await axios.post("/api/v2/auth/register",form.state);
            setSuccess(data.data.message);
            setError(false);
        }catch(i){
            setSuccess(false);
            setError(i.response.data.message);
        }
        form.unlock();
        setLoading(false);
    }
    function handleLogin()
    {
        history.push("/login")
    }
    return <>
        <Box m="auto" ml={10}>
            <Card variant="elevation" elevation={3} sx={{width:{md:"25vw"},minHeight:"50vh",display:"flex",flexDirection:"column"}}>
                {loading && <LinearProgress />}
                <Box textAlign="center" my={3}>
                    <Typography variant="h5">Yeni Bir saQut Hesabı Oluşturun</Typography>
                </Box>
                <Box flex={1}/>
                <Box mb={3} px={2}>
                    <TextField
                        type="text"
                        label="Adınız"
                        fullWidth
                        {...form.input("name")}
                    />
                </Box>
                <Box mb={3} px={2}>
                    <TextField
                        type="text"
                        label="Soyadınız"
                        fullWidth
                        {...form.input("surname")}
                    />
                </Box>
                <Box mb={3} px={2} display="flex" flexDirection="row">
                    <Box flex={1}>
                        <TextField
                            type="text"
                            label="Mail Adresiniz"
                            fullWidth
                            {...form.input("email")}
                        />
                    </Box>
                    <Box flex={1} ml={1}>
                        <TextField
                            type="text"
                            label="Telefon Numaranız"
                            fullWidth
                            {...form.input("phone")}
                        />
                    </Box>
                </Box>
                <Box mb={3} px={2} display="flex" flexDirection="row">
                    <Box flex={1}>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel id="gender-label">Cinsiyetiniz</InputLabel>
                            <Select
                                labelId="gender-label"
                                value={""}
                                label="Cinsiyetiniz"
                                {...form.input("gender")}
                                fullWidth
                            >
                                <MenuItem value={""}>Seçiniz</MenuItem>
                                <MenuItem value="erkek">Erkek</MenuItem>
                                <MenuItem value="Kadın">Kadın</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box flex={1} ml={1}>
                        <MobileDatePicker
                            label="Doğum Tarihiniz"
                            inputFormat="DD/MM/yyyy"
                            renderInput={props => <TextField {...props} />}
                            value={form.val("dateofbirth")}
                            onChange={newValue => form.val("dateofbirth", newValue)}
                            InputProps={{
                                disabled:form.disabled
                            }}
                        />
                    </Box>
                </Box>
                <Box mb={3} px={2}>
                    <PasswordView
                        label="Şifreniz"
                        fullWidth
                        {...form.input("password")}
                    />
                </Box>
                <Box mb={3} px={2}>
                    <PasswordView
                        label="Şifreniz (Tekrar)"
                        fullWidth
                        {...form.input("passwordVerif")}
                    />
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
                    <Button size="large" variant="contained" color="primary" onClick={handleSubmit}>Kayıt Ol</Button>
                    <Button size="large" variant="contained" color="success" onClick={handleLogin}>Giriş Yap</Button>
                </Box>
            </Card>
        </Box>
    </>;
}
function PasswordView(props)
{
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(e => !e);
    return <TextField
        type={showPassword ? "text" : "password"}
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
        {...props}
    />
}