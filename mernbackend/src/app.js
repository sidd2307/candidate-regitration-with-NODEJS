const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs")

require("./db/conn");
const Register = require("./models/registers")

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public" );
const template_path = path.join(__dirname, "../templates/views" );
const partials_path = path.join(__dirname, "../templates/partials" );

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
app.use(express.static('public'));
hbs.registerPartials(partials_path)

// if no index.html, by default this is the index.html
app.get("/", (req, res) => {
    res.render("index");
})

app.get("/register", (req, res) => {
    res.render("register");
})

// Create a new user in our database
app.post("/register", async (req, res) => {
    try {
        
        const password = req.body.password;
        const confirmpassword = req.body.confirmpassword;

        if(password === confirmpassword){
            const registerCandidate = new Register({
                firstname : req.body.firstname,
                middlename : req.body.middlename,
                lastname : req.body.lastname,
                email : req.body.email,
                phone : req.body.phone,
                password : password,
                confirmpassword : confirmpassword
            })

            const registered = await registerCandidate.save();
            res.status(201).render("index");

        }else{
            res.send("passwords are not matching")
        }

        console.log(req.body.firstname);
        res.send(req.body.firstname);

    } catch (error) {
        res.status(400).send(error);
    }
})

app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
})