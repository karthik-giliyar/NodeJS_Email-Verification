const { userModel } = require("../models/user")
const { OTPModel } = require("../models/otp")
const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const otpgenerator = require('otp-generator')
const nodemailer = require("nodemailer")


module.exports.signup = async(req,res)=>{
    const errors = validationResult(req.body)
    if(!errors.isEmpty()) {
        res.status(400).send({error: errors.array()[0].msg})  
    }

	const newPassword = await bcrypt.hash(req.body.password, 10)
    req.body.password = newPassword

    const userObj = new userModel(req.body)
    userObj.save()
    .then(()=>{
        res.send({message:"user registered successfully", success:true})
    })
    .catch(()=>{
        res.send({error:"unable to add user to db", success:false})
    })

}



module.exports.signin = async(req,res)=>{
    try{
        const user = await userModel.findOne({
            email: req.body.email
        })

        if( user === null) return res.status(401).send({message:"uesr not found"})

        const OTP = otpgenerator.generate(6,{
            digits:true, lowerCaseAlphabets :false, upperCaseAlphabets :false, specialChars:false
        })
        // nodemailer
        nodemailer.createTestAccount((err, account) => {
            if (err) {
                res.send('Failed to create a testing account. ' + err.message);
            }
            else{

                let transporter = nodemailer.createTransport({
                    host: "smtp.ethereal.email",
                    port: 587,
                    secure: false, 
                    auth: {
                        user: 	"ardith.auer67@ethereal.email", 
                        pass: "FmTZmRxdffATejp5Vs", 
                    },
                });
    
                const msg = {
                    from: "karthikgiliyar33@gmail.com",
                    to: req.body.email,
                    subject: "OTP for login",
                    text:"yopur otp is "+OTP
                }
    
                transporter.sendMail(msg,(error, info)=>{
                    if(error){
                        res.send({message:"unable to send otp"})
                    }
                    else{

                        console.log(OTP)
                        // encryption
                        const encrypt = async(OTP)=>{

                            try{
                                const encrypted = await bcrypt.hash(OTP, 10)
                                const otp = new OTPModel({email:req.body.email, otp: encrypted})
                                otp.save()
                                .then(()=>{
                                    res.send({message:"otp saved to db successfully"})
                                })
                                .catch((error)=>{
                                    res.send({error:"unable to save otp to db"})
                                })
                            }catch{
                                res.send({error:"syntax error"})
                            }
                            
                        }
                        encrypt(OTP)
                        
                    }
                })
            }

        })

    }catch{
        res.send({message:"syntax error"})
    }
}

module.exports.verify = async(req,res)=>{

    try{
        const otpHolders = await OTPModel.find({
            email: req.body.email
        })
        
        if(otpHolders.length === 0) return res.status(401).send({message:"otp expired"})

        let currentOtpHolders = otpHolders[otpHolders.length -1]

        let validOtp = await bcrypt.compare((req.body.otp).toString(), currentOtpHolders.otp)

        if(validOtp){
            res.send({message:"login successfull", success:true})
            const deleteOtp = await OTPModel.deleteMany({
                email: req.body.email
            })
        }else{
            res.send({message:"wrong otp", success:false})
        }
    }
    catch (e) {
        console.log(e,"wrong ley")
    }
}

