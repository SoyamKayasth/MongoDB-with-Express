  
  const mongoose = require('mongoose');
  const { schema } = mongoose;
  const Chat = require('./models/chat');  // Importing the Chat model



  main()
.then(() => console.log('MongoDB is connected...'))    
   .catch(err => console.log(err));            

async function main(){
    await mongoose.connect('mongodb://localhost:27017/chat_DB');
}
   

 let chats = [
  {
    from: "Neha",
    to: "Karan",
    msg: "Did you reach home safely after the movie?",
    createdAt: new Date("2026-02-10T22:15:00")
  },
  {
    from: "Karan",
    to: "Neha",
    msg: "Yes, just got in. The traffic was crazy today.",
    createdAt: new Date("2026-02-10T22:18:00")
  },
  {
    from: "Aisha",
    to: "Rahul",
    msg: "Can you review my project report before submission?",
    createdAt: new Date("2026-02-11T16:40:00")
  },
  {
    from: "Rahul",
    to: "Aisha",
    msg: "Sure, send it over. I’ll check it tonight.",
    createdAt: new Date("2026-02-11T16:45:00")
  },
  {
    from: "Meera",
    to: "Sanjay",
    msg: "Mom asked if you’re coming for dinner tomorrow.",
    createdAt: new Date("2026-02-12T18:05:00")
  },
  {
    from: "Sanjay",
    to: "Meera",
    msg: "Yes, I’ll be there by 8 pm.",
    createdAt: new Date("2026-02-12T18:07:00")
  },
  {
    from: "Vikram",
    to: "Anita",
    msg: "The server deployment is done. Please verify once.",
    createdAt: new Date("2026-02-13T10:25:00")
  },
  {
    from: "Anita",
    to: "Vikram",
    msg: "Checked. Everything looks good. Great work!",
    createdAt: new Date("2026-02-13T10:40:00")
  },
  {
    from: "Rohan",
    to: "Simran",
    msg: "Are we still planning the Goa trip in March?",
    createdAt: new Date("2026-02-14T20:10:00")
  },
  {
    from: "Simran",
    to: "Rohan",
    msg: "Yes! I’m booking tickets this weekend.",
    createdAt: new Date("2026-02-14T20:15:00")
  },
  {
    from: "Priya",
    to: "Manish",
    msg: "Don’t forget to bring the lab file tomorrow.",
    createdAt: new Date("2026-02-15T21:00:00")
  },
  {
    from: "Manish",
    to: "Priya",
    msg: "Thanks for reminding me. I almost forgot.",
    createdAt: new Date("2026-02-15T21:05:00")
  },
  {
    from: "Tanya",
    to: "Kabir",
    msg: "The interview is scheduled for Monday at 11 am.",
    createdAt: new Date("2026-02-16T09:30:00")
  },
  {
    from: "Kabir",
    to: "Tanya",
    msg: "Perfect. I’ll prepare over the weekend.",
    createdAt: new Date("2026-02-16T09:35:00")
  },
  {
    from: "Dev",
    to: "Ishita",
    msg: "Can you share the design files from yesterday’s meeting?",
    createdAt: new Date("2026-02-17T13:50:00")
  },
  {
    from: "Ishita",
    to: "Dev",
    msg: "Uploading them to the drive now. Check in 10 minutes.",
    createdAt: new Date("2026-02-17T13:55:00")
  }
];
        
Chat.insertMany(chats).then((res) => console.log('Chat message saved to the database...' , res))
    .catch(err => console.log(err));
