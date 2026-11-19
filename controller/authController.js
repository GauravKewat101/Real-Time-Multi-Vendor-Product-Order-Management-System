const User = require("../model/userModel");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const isExists = await User.findOne({ email, isActive: false });

    if (isExists) {
      res.status(202).json({
        message: "user already exists",
      });
    }

    const hashPass = await bcrypt.hash(password, 12);

    await User.create({ name, email, password: hashPass });

    res.status(201).json({
      message: "user registered successfully",
    });

  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.login = async (req,res) => {

    try { 
        const {email, password } = req.body;

        const user = await User.findOne({email});

        if(!user) {
            res.status(404).send({message: 'user not found'});
        }

        const isValid = await bcrypt.compare(password , user.password);

        if(!isValid){
            res.status(404).send({message: 'Invalid credentials'});
        }

        const token = jwt.sign({userId: user._id, role: user.role},process.env.JWT_SECRET,{expiresIn: '1d'});

        res.status(200).send({
          message: "login successfully!",
          token
        });

    } catch (err) {
        res.status(500).json( { message: err});
    }
}
