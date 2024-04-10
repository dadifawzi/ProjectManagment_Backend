const cron = require("node-cron");
const boardistoy = require("../model/history.model");

//add first history
let test = boardistoy.find().then((res)=>{
    console.log('history length is : '+res.length);


    if (res.length == 0) {
  let history = new boardistoy();
  history.date = new Date();
  history.completed = 0;
  history.inprogress = 0;
  history.backlog = 0;
  history.inhold = 0;

  history
    .save()
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}



});




// Schedule the cron job to run on the first day of every month at 12:00 AM
cron.schedule(
  "0 0 1 * *",
  async () => {
    let data;
    let completed = 0;
    let inprogress = 0;
    let inhold = 0;
    let backlog = 0;

    try {
      data = boardistoy.find().then((res)=>{

//counting
      res.forEach((item) => {
        completed += item.completed.length;
        inprogress += item.inprogress.length;
        backlog += item.backlog.length;
        inhold += item.inhold.length;
      });
      // add counts to history table
      let history = new boardistoy();
      history.date = new Date();
      history.completed = completed;
      history.inprogress = inprogress;
      history.backlog = backlog;
      history.inhold = inhold;

      history
        .save()
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });


      });

      
    } catch (error) {
      console.error("Error occurred:", error);
    }
  },
  {
    timezone: "Europe/Paris",
  }
);
