var posts = [
  {
    id: 1,
    title: "The email line that's client repellent",
    body: "I’d gone through a few droughts as a freelancer, but this one was bad. Each day, the stress mounted. The magnitude of every new client meeting ballooned greater than ever before. Before each meeting, I went in knowing one thing; 'I need this job.' It’s the nature of being a freelancer. By definition, the work ends.",
    author: "http://letsworkshop.com/blog/the-email-line/"
  },
  {
    id: 2,
    title: "The Moderately Enthusiastic Programmer",
    body: "I feel like I’m practically the poster child for the “passionate programmer”. I code for fun, always have. I’m like the stereotype of the guy who’d be programming even if it didn’t pay. I play with new programming languages for the sheer hell of it. I write and speak about the joy of coding, and try my best to pass that joy along to others as best I can.",
    author: "http://devblog.avdi.org/2014/01/31/the-moderately-enthusiastic-programmer/"
  },
  {
    id: 3,
    title: "The Magic of Strace",
    body: "Early in my career, a co-worker and I were flown from Memphis to Orlando to try to help end a multi-day outage of our company’s corporate Lotus Domino server. The team in Orlando had been fire-fighting for days and had gotten nowhere. I’m not sure why they thought my co-worker and I could help. We didn’t know anything at all about Lotus Domino. But it ran on UNIX and we were pretty good with UNIX. I guess they were desperate.",
    author: "http://chadfowler.com/blog/2014/01/26/the-magic-of-strace/"
  },
  {
    id: 4,
    title: "http://nightwatchjs.org/",
    body: "Simple but powerful syntax which enables you to write tests very quickly, using only Javascript and CSS selectors. No need to initialize other objects and classes, you only need to write the test specs. Built-in command-line test runner which enables you to run the tests either altogether, by group or single.",
    author: "http://nightwatchjs.org/"
  },
  {
    id: 5, 
    title: "The upside to being let go by Nokia",
    body: "During the years of Nokia's decline, culminating in the sale of its mobile phone division to Microsoft in September, thousands of workers were made redundant. But the ex-Nokians have now created hundreds of new companies - thanks partly to a very Finnish level of support from the employer to its departing staff.",
    author: "http://www.bbc.co.uk/news/magazine-25965140"
  },
  {
    id: 6,
    title: "PayPal Mafia",
    body: "PayPal Mafia is a term used to indicate a group of former PayPal employees and founders who have since founded and developed additional technology companies such as Tesla Motors, LinkedIn, Palantir Technologies, SpaceX, YouTube, Yelp Inc., and Yammer.",
    author: "http://en.wikipedia.org/wiki/PayPal_Mafia"
  },
  {
    id: 7,
    title: "You might not need jQuery",
    body: "jQuery and its cousins are great, and by all means use them if it makes it easier to develop your application. If you're developing a library on the other hand, please take a moment to consider if you actually need jQuery as a dependency. Maybe you can include a few lines of utility code, and forgo the requirement. If you're only targeting more modern browsers, you might not need anything more than what the browser ships with.",
    author: "http://youmightnotneedjquery.com/?hn"
  }
];

// You can implement your module.exports here

module.exports = {
  all: function() {
    return posts;
  },
  find: function(id) {
    return posts[id - 1];
  }
};