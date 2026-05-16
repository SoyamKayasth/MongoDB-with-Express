  const express = require('express');
  const mongoose = require('mongoose');
  const { schema } = mongoose;
  const methodOverride = require('method-override');
  const ExpressError = require('./ExpressError');
    const app = express();
    const port = 3000;
    const path = require('path');
    const Chat = require('./models/chat');  // Importing the Chat model

  // Middleware setup
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(methodOverride('_method')); // Use method override middleware
    
    // Set EJS as the view engine and specify the views directory
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');
      

   // Connect to MongoDB      
main()
.then(() => console.log('MongoDB is connected...'))    
   .catch(err => console.log(err));            

async function main(){
    await mongoose.connect('mongodb://localhost:27017/chat_DB');
}


// Creating an asyncWrap function to handle asynchronous errors in route handlers 
     function asyncWrap(fn){
           return function(req , res , next){
               fn(req , res , next).catch(err => next(err)); // Catch any errors thrown by the async function and pass them to the next middleware (error handler)
           }
     }  
    


// Basic route to test the server
   app.get('/' , (req , res) => {
         res.send('Welcome to my server'); 
    });
    
    // Index route to show all chat messages
    app.get('/chats', asyncWrap( async (req , res, next) => {
       
            const chats = await Chat.find().sort({ createdAt: -1 }); // Fetch all chats sorted by creation date
            res.render('index', { chats }); // Render the index view with the chats data

    }));


   // Route to show the form for creating a new chat message

      app.get('/chats/new', (req , res) => {
    
        res.render('new'); // Render the form to create a new chat message
      });    
        
// Route to handle the creation of a new chat message

     app.post('/chats', async (req , res) => {
           const { from , to , msg } = req.body; // Extract name and message from the request body
             //  console.log(from , to + "\n" , msg);
            await Chat.create({ from, to, msg })  // Create a new chat message in the database and save it automatically
                .then(chat => {
                    // console.log('New chat created:', chat);
                    res.redirect('/chats');
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).send('Error creating chat');
                });
     }) 
    
// to display a chat message in detail when the "View more" button is clicked

   app.get("/chats/:id", asyncWrap( async(req , res , next) => {
         const {id} = req.params; // Extract the chat ID from the request parameters
        
             const chat = await Chat.findById(id); // Find the chat message by its ID
             if (!chat) {
                // return res.status(404).send('Chat not found');
             return next(new ExpressError(404 , "Chat not found"));
             }
             res.render('show.ejs', { chat }); // Render the show view with the chat data

   }));

   // Route to handle the update of a chat message when the "Edit" button is clicked

   app.put('/chats/:id', asyncWrap( async (req , res , next) => {

       const {id} = req.params;
        const {newMsg} = req.body; 

        let updatedChat = await Chat.findByIdAndUpdate(id ,
              {msg : newMsg},
              {runValidators : true ,
                /* new : true,*/
                 returnDocument : 'after', 
              }
         );
              console.log(updatedChat);

               res.redirect('/chats'); 
      
   }));

  // Route to handle the deletion of a chat message when the "Delete" button is clicked 
      
     app.delete("/chats/:id" , asyncWrap(async (req , res , next) => {     
           const {id} = req.params; // Extract the chat ID from the request parameters
             
          await Chat.findByIdAndDelete(id) // Find the chat message by its ID and delete it from the database
                .then(() => {   
                    console.log('Chat deleted successfully');
                    
                         res.status(200).json({ message: "Chat is deleted Successfully!" });

                    // res.redirect('/chats'); // Redirect to the chats index page after deletion
                }) 
                .catch(err => {
                    console.log(err);
//                    res.status(500).send('Error deleting chat');
                    next(err);
                });         
                    
     }));

// creating a error handler middleware to handle any errors that may occur during the request processing

    app.use((err , req, res , next) => {
      let { status = 500 , message = "Something went wrong" }  = err;

          res.status(status).send(message);
        });




   app.listen(port, () => {
     console.log(`Server is running on port:  http://localhost:${port}/chats`);
 });



        