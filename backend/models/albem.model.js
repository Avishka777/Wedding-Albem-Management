import mongoose from 'mongoose';

const albemSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      default:
        'https://media.istockphoto.com/id/1455769561/photo/stylish-rings-flowers-on-wooden-table-background-letters-from-the-bride-and-groom-vows.jpg?s=2048x2048&w=is&k=20&c=mfZKDnegqoHujqrzHjtgH_LbWHESgq5DgC7vpjAoSCA=',
    },
    image1: {
      type: String,
      default:
        'https://media.istockphoto.com/id/1455769561/photo/stylish-rings-flowers-on-wooden-table-background-letters-from-the-bride-and-groom-vows.jpg?s=2048x2048&w=is&k=20&c=mfZKDnegqoHujqrzHjtgH_LbWHESgq5DgC7vpjAoSCA=',
    },
    image2: {
      type: String,
      default:
        'https://media.istockphoto.com/id/1455769561/photo/stylish-rings-flowers-on-wooden-table-background-letters-from-the-bride-and-groom-vows.jpg?s=2048x2048&w=is&k=20&c=mfZKDnegqoHujqrzHjtgH_LbWHESgq5DgC7vpjAoSCA=',
    },
    image3: {
      type: String,
      default:
        'https://media.istockphoto.com/id/1455769561/photo/stylish-rings-flowers-on-wooden-table-background-letters-from-the-bride-and-groom-vows.jpg?s=2048x2048&w=is&k=20&c=mfZKDnegqoHujqrzHjtgH_LbWHESgq5DgC7vpjAoSCA=',
    },
    image4: {
      type: String,
      default:
        'https://media.istockphoto.com/id/1455769561/photo/stylish-rings-flowers-on-wooden-table-background-letters-from-the-bride-and-groom-vows.jpg?s=2048x2048&w=is&k=20&c=mfZKDnegqoHujqrzHjtgH_LbWHESgq5DgC7vpjAoSCA=',
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Albem = mongoose.model('Albem', albemSchema);

export default Albem;