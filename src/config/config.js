var env = "demo"
var configration = {};
if (env == "local") {
    configration = { 
        localhostBackend:"http://localhost:4000/",
        localhostFrontend:'http://localhost:3001/', 
    }
} 
else if (env == "demo") {
    configration = { 
        localhostBackend:"https://api.valobitdemo2.com/",
        localhostFrontend:'https://panel.valobitdemo2.com/', 
    }
} 
else {
    configration = {
        localhostBackend : 'https://api.vbitcake.io/', 
        localhostFrontend:'https://adminpanel.vbitcake.io/',
    }
}


export default configration;