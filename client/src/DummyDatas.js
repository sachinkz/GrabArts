import ab1 from "./Assets/ab1.jpg"
import ab2 from "./Assets/ab2.jpg"
import ab3 from "./Assets/ab3.jpg"
import ab4 from "./Assets/ab4.jpg"
import abprof from "./Assets/abProfile.png"
import sa1 from "./Assets/1684739135720.jpg"
import sa2 from "./Assets/1684739135708.jpg"
import sa3 from "./Assets/1684739135732.jpg"
import sa4 from "./Assets/1684739135743.jpg"
import gokProf from "./Assets/gokProfile.png"

export const DUMMY_POSTS = [
  {
    postId: "p1",
    caption: "A new realistic drawing",
    imageUrl: sa1,
    artistId: "u2",
    artist: "poochandy",
    comments: [
      {
        commentor: "poochandy",
        commentorId: "u2",
        comment:
          "wow looks so realistic sdfs sdfsd sdfsdfsdf sdf sdfsdf sdfsdfsdf sdfsdf sdfsdfsdfsdf sdfsdfsdf sdfsdfsdfsdf",
      },
      {
        commentor: "sukumaran",
        commentorId: "u3",
        comment: "great work",
      },
      {
        commentor: "rameshan",
        commentorId: "u4",
        comment: "Nice",
      },
    ],
  },
  {
    postId: "p2",
    caption: "A new realistic drawing",
    imageUrl: sa2,
    artistId: "u2",
    artist: "poochandy",

    comments: [
      {
        commentorId: "u2",
        comment: "wow looks so realistic",
        commentor: "maayaandy",
      },
      {
        commentorId: "u3",
        comment: "great work",
        commentor: "shambu",
      },
      {
        commentorId: "u4",
        comment: "Nice",
        commentor: "lokesh",
      },
    ],
  },
  {
    postId: "p4",
    caption: "A new realistic drawing",
    imageUrl: sa4,
    artistId: "u2",
    artist: "poochandy",

    comments: [
      {
        commentorId: "u2",
        comment: "wow looks so realistic",
        commentor: "maayaandy",
      },
      {
        commentorId: "u3",
        comment: "great work",
        commentor: "shambu",
      },
      {
        commentorId: "u4",
        comment: "Nice",
        commentor: "lokesh",
      },
    ],
  },
  {
    postId: "p3",
    caption: "A new realistic drawing",
    imageUrl: sa3,
    artistId: "u2",
    artist: "poochandy",
    comments: [
      {
        commentorId: "u2",
        comment: "wow looks so realistic",
        commentor: "maayaandy",
      },
      {
        commentorId: "u3",
        comment: "great work",
        commentor: "shambu",
      },
      {
        commentorId: "u4",
        comment: "Nice",
        commentor: "lokesh",
      },
    ],
  },
]

export const ARTISTS = [
  {
    artistId: "u1",
    fname: "Maayaandy",
    lname: "Schwarz",
    image: abprof,
    lowestPricing: 1000,
    highestPricing: 2000,
    rating: 4.5,
    isVerified: true,
    styles: ["pencil drawing", "coloured Pencil"],
    works: [ab1, ab2, ab3, ab4],
  },
  {
    artistId: "u2",
    fname: "poochandy",
    lname: "mondyse",
    image: gokProf,
    lowestPricing: 4000,
    highestPricing: 6000,
    rating: 4.6,
    isVerified: true,
    styles: ["pencil drawing", "coloured Pencil", "Stencil"],
    works: [sa1, sa2, sa3, sa4],
  },
]

export const REVIEWS = [
  {
    artistId: "u1",
    reviewerId: "u2",
    reviewer: "poochandy",
    review: "excellent artist ,gives 100% to the work ",
  },
  {
    artistId: "u1",
    reviewer: "poochandy",
    reviewerId: "u2",
    review: "excellent artist ,super ",
  },
  {
    artistId: "u2",
    reviewer: "maayaandy",
    reviewerId: "u1",
    review: "verygoood work ,gives 100% to the work ",
  },
  {
    artistId: "u2",
    reviewer: "maayaandy",
    reviewerId: "u1",
    review: "excellent works ,loved it ",
  },
]




export const PRICING = [
  {
    artistId: "u2",
    styles: [
      {
      style: 'pencil',
      a5f1: 800,
      a5f2: 1200,
      a5f2plus: "varries",
      a4f1: 1000,
      a4f2: 1400,
      a4f2plus: "varries",
      a3f1: 1200,
      a3f2: 1600,
      a3f2plus: "varries",
    },
      {
      style:'Color Pencil',
      a5f1: 1400,
      a5f2: 1800,
      a5f2plus: "varries",
      a4f1: 2000,
      a4f2: 2400,
      a4f2plus: "varries",
      a3f1: 3000,
      a3f2: 3600,
      a3f2plus: "varries",
      },
    ]
  },
  {
    artistId: "u1",
    styles: [{
      style:'pencil',
      a5f1: 800,
      a5f2: 1200,
      a5f2plus: "varries",
      a4f1: 1000,
      a4f2: 1400,
      a4f2plus: "varries",
      a3f1: 1200,
      a3f2: 1600,
      a3f2plus: "varries",
    },
      {
      style:'Color Pencil',
      a5f1: 800,
      a5f2: 1200,
      a5f2plus: "varries",
      a4f1: 1000,
      a4f2: 1400,
      a4f2plus: "varries",
      a3f1: 1200,
      a3f2: 1600,
      a3f2plus: "varries",
    },
      {
      style:'painting',
      a5f1: 900,
      a5f2: 1300,
      a5f2plus: "varries",
      a4f1: 1100,
      a4f2: 1500,
      a4f2plus: "varries",
      a3f1: 1300,
      a3f2: 1700,
      a3f2plus: "varries",
    },
  ]
  },
]