const mongoose = require('mongoose');
const Feed= require('../models/feed')
const Article = require('../models/article')

mongoose.connect('mongodb://localhost:27017/feeds')


const data = {
  "feeds": [
    {
      "url": "techcrunch.com/feed/atom/",
      "name": "TechCrunch"
    },
    {
      "url": "feed.slate.com/slate",
      "name": "Slate"
    },
    {
      "url": "http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml",
      "name": "New York Times"
    }
  ],
  "articles":[
    {
      "title":"Tillerson Warns Russia that Assad Era Is 'Coming to an End'",
      "publisher":"New York Times",
      "image":"https://static01.nyt.com/images/2017/04/12/world/12Diplo/12Diplo-moth.jpg",
      "url": "http://www.nytimes.com/2017/04/11/world/europe/russia-syria-rex-tillerson.html",
      "description":"The secretary of state said President Vladimir Putin of Russia must end his alliance with Bashar al-Assad or risk becoming irrelevant in the Middle East."
    },
    {
      "title":"On Trump's Syria Strategy, One Voice Is Missing: Trump's",
      "publisher":"New York Times",
      "image":"https://static01.nyt.com/images/2017/04/11/us/11TRUMPSYRIA-01/11Tillerson-moth.jpg",
      "url": "http://www.nytimes.com/2017/04/10/world/middleeast/syria-trump-assad.html",
      "description":"Administration officials have described starkly different foreign policies since last week’s cruise missile strike, and President Trump has yet to clarify."
    },
    {
      "title":"Feud Over Syria Missile Strike May Have an Upside for U.S. and Russia",
      "publisher":"New York Times",
      "image":"http://oi63.tinypic.com/4sbdpx.jpg",
      "url": "http://www.nytimes.com/2017/04/11/world/missile-strike-syria-reset-russia-us-relations.html",
      "description":"The American attack has freed leaders in Washington and Moscow from the constraints that come with the perception of a special, friendly relationship."
    },
    {
      "title":"Trump Says China Will Get Better Trade Deal if It Solves 'North Korean Problem'",
      "publisher":"New York Times",
      "image":"https://static01.nyt.com/images/2017/04/12/world/12TrumpAsia/12TrumpAsia-moth.jpg",
      "url": "http://www.nytimes.com/2017/04/11/world/asia/trump-china-trade-north-korea.html",
      "description":"President Trump's Twitter posts capture his quandary in dealing with the nuclear threat from North Korea: Only China can realistically force a change in the behavior of Kim Jong-un."
    },
    {
      "title":"Move of U.S. Warships Shows Trump Has Few Options on North Korea",
      "publisher":"New York Times",
      "image":"https://static01.nyt.com/images/2017/04/11/us/11Korea-01/11Korea1-moth.jpg",
      "url": "http://www.nytimes.com/2017/04/10/world/asia/north-korea-china-south.html",
      "description":"President Trump is confronting North Korean aggression with a set of tools that has had limited success for the United States in the past."
    },
    {
      "title":"The Latest Test for the White House? Pulling Off Its Easter Egg Roll",
      "publisher":"New York Times",
      "image":"https://static01.nyt.com/images/2017/04/05/us/05eggroll2/05eggroll2-moth.jpg",
      "url": "http://www.nytimes.com/2017/04/11/us/politics/white-house-easter-egg-roll-trump.html",
      "description":"With key staff positions unfilled and no on-site first lady, the White House is trying to organize the most elaborate and heavily scrutinized public event of the year."
    },
    {
      "title":"Trump Administration Hunts for Easter Eggs, and Senior Staff",
      "publisher":"New York Times",
      "image":"http://oi63.tinypic.com/4sbdpx.jpg",
      "url": "http://www.nytimes.com/video/us/politics/100000005018390/trump-administration-hunts-for-easter-eggs-and-senior-staff.html",
      "description":"The White House is as much as two months behind recent standards for presidential transitions, leaving 90 percent of the positions considered critical to leadership unfilled. It did, however, manage to order the eggs for the Easter egg roll."
    },
    {
      "title":"Secret A.T.F. Account Paid for $21,000 Nascar Suite and Las Vegas Trip",
      "publisher":"New York Times",
      "image":"https://static01.nyt.com/images/2017/04/11/us/11ATF/11ATF-moth.jpg",
      "url": "http://www.nytimes.com/2017/04/11/us/politics/alcohol-tobacco-firearms-atf.html",
      "description":"The revelations highlight the lax oversight at the A.T.F. that allowed agents and informants to spend millions while avoiding the normal accounting process."
    }
  ]
}
let seeder = {
  "drop": () => {
    Feed.remove({}, () => {
      console.log('emptied db of feeds');
      Article.remove({}, () => {
        console.log('emptied db of articles')
        seeder.seed();
      });
    })
  },

  "seed": () => {
    console.log( 'seeding' )
    let feeds = data.feeds;
    for ( feed of feeds ) {
      console.log('feed name', feed)
      Feed.create({
        name: feed.name,
        url: feed.url
      }, ( err, doc ) => {
        if ( err ) {
          console.log('err', err);
        } else {
          console.log('added to the db', doc);
          let articles = data.articles;
          for ( article of articles ) {
            if ( article.publisher === doc.name ) {
              Article.create( {
                url: article.url,
                datePublished: article.date_written,
                feedId: doc._id,
                description: article.description,
                image: article.image
                 }, function(err, doc) {
                    if (err) {
                      console.log('ERR', err)
                    } else {
                      console.log('added article to the db', doc);
                      mongoose.connection.close(function() {
                        console.log('close')
                      });
                    }
                } )
            }

          }
        }
      })
    }
  }
}

seeder.drop();
seeder.seed();


