const express =require("express");
const multer = require('multer');
const singupRoute=require("./routes/signup")
const loginRoute=require("./routes/login")
const userRoute=require("./routes/user")
const cors=require("cors")
const bodyParser =require("body-parser");

const createAdminAccount=require("./scripts/admin")
const { mongoose } = require("./configuration/dbConfig");
const { authenticateToken } = require("./utils/authMiddeleware");

const app=express();
app.use(cors())
const PORT=process.env.PORT || 5000;

app.use(bodyParser.json())

createAdminAccount();
app.use(express.json());

const ImageSchema = new mongoose.Schema({
    title: String,
    description: String, // Add description field
    amount: Number, // Add amount field
    image: String,
});

const Image = mongoose.model('Image', ImageSchema);

app.use('/uploads', express.static('uploads'));
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage });

// Routes
app.post('/upload', upload.single('image'), async (req, res) => {
    const { title, description, amount } = req.body; // Get description and amount from body
    const image = new Image({
        title,
        description, // Save description
        amount, // Save amount
        image: req.file.path,
    });
    await image.save();
    res.status(201).json(image);
});

app.get('/images',authenticateToken, async (req, res,) => {
    const images = await Image.find();
    res.json(images);
});

app.put('/images/:id', upload.single('image'), async (req, res) => {
    const { id } = req.params;
    const { title, description, amount } = req.body; 
    const updateData = { title, description, amount };
    if (req.file) {
        updateData.image = req.file.path;
    }
    const updatedImage = await Image.findByIdAndUpdate(id, updateData, { new: true });
    res.json(updatedImage);
});

app.delete('/images/:id', async (req, res) => {
    const { id } = req.params;
    await Image.findByIdAndDelete(id);
    res.json({ message: 'Image deleted' });
});







app.use("/user",singupRoute);
app.use("/auth",loginRoute);
app.use("/api",userRoute)




app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})