const crypto = require("crypto")
const fs = require("fs")
const path = require("path")

const Generate_Jwt_Secret = () => {
    const envPath = path.join(__dirname,"..",".env")
    const secretKey = crypto.randomBytes(32).toString("hex")
    if(fs.existsSync(envPath)){
        let envContent = fs.readFileSync(envPath,"utf8")

        if(envContent.includes("JWT_SECRET=")){
            console.log("JWT_SECRET already exists in .env file. No update needed")
            return;
        }
        else{
            envContent += `\nJWT_SECRET=${secretKey}\n`
            fs.writeFileSync(envPath,envContent,"utf8")
            console.log("JWT_SECRET added to .env file")
        }
    }
    else{
        fs.writeFileSync(envPath,`JWT_SECRET=${secretKey}\n`,"utf8")
        console.log("JWT_SECRET created and saved in new .env file")
    }
}

module.exports = Generate_Jwt_Secret