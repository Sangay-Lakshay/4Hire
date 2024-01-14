const User = require('./../models/userModel')

exports.updateMe = async (req, res, next) => {
    // 1) Create error if user POSTs password data
    if (req.body.password || req.body.passwordConfirm) {
      return next(
        new AppError(
          'This route is not for password updates. Please use /updateMyPassword.',
          400
        )
      );
    }
  
    // 2) Filtered out unwanted fields names that are not allowed to be updated
    const filteredBody = filterObj(req.body, 'name', 'email', 'rating', 'report');
  
    // 3) Update user document
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
      new: true,
      runValidators: true
    });
  
    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser
      }
    });
  };
  
  exports.deleteMe = async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false });
  
    res.status(204).json({
      status: 'success',
      data: null
    });
  };
  

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({data: users, status: 'Success'});

    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

exports.createUser = async (req, res) => {
    try {
        const users = await User.create(req.body);
        console.log(req.body.name);
        res.json({data: users, status: 'Success'});

    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

exports.getUser = async (req, res) => {
    try {
        const users = await User.findById(req.params.id);
        res.json({data: users, status: 'Success'});

    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

exports.updateUser = async (req, res) => {
    try {
        const users = await User.findByIdAndUpdate(req.params.id);
        res.json({data: users, status: 'Success'});

    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const users = await User.findByIdAndDelete(req.params.id);
        res.json({data: users, status: 'Success'});

    } catch (err) {
        res.status(500).json({error: err.message});
    }
}