import Albem from '../models/albem.model.js';
import { errorHandler } from '../utils/error.js';


//Add Albem
export const create = async (req, res, next) => {

  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, 'Please Provide All Required Fields'));
  }
  const slug = req.body.title
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, '');
  const newAlbem = new Albem({
    ...req.body,
    slug,
    userId: req.user.id,
  });
  try {
    const savedAlbem = await newAlbem.save();
    res.status(201).json(savedAlbem);
  } catch (error) {
    next(error);
  }
};


//Get Albem Details
export const getalbems = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;
    const albems = await Albem.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.title && { category: req.query.title }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.albemId && { _id: req.query.albemId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: 'i' } },
          { content: { $regex: req.query.searchTerm, $options: 'i' } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalAlbems = await Albem.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthAlbems = await Albem.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      albems,
      totalAlbems,
      lastMonthAlbems,
    });
  } catch (error) {
    next(error);
  }
};


//Delete Albem
export const deletealbem = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You Are Not Allowed To Delete This Albem'));
  }
  try {
    await Albem.findByIdAndDelete(req.params.albemId);
    res.status(200).json('The Albem Has Been Deleted');
  } catch (error) {
    next(error);
  }
};


//Update Albem
export const updatealbem = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId){
    return next(errorHandler(403, 'You Are Not Allowed To Update This Albem'));
  }
  try {
    const updatedAlbem = await Albem.findByIdAndUpdate(
      req.params.albemId,
      {
        $set: {
          title: req.body.title,
          image: req.body.image,
          image1: req.body.image1,
          content: req.body.content,
          image2: req.body.image2,
          image3: req.body.image3,
          image4: req.body.image4,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedAlbem);
  } catch (error) {
    next(error);
  }
};