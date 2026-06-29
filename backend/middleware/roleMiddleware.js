export const isAdmin = async(req,res,next)=>{
    if(req.user.role==="Admin"){
        res.status(403).json({
            message:"Admin access only",
        });
    }
    next();
}

export const isProjectManager = (req, res, next) => {
  if (req.user.role !== "projectManager") {
    return res.status(403).json({
      message: "Project Manager access only",
    });
  }

  next();
};

export const isUser = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(403).json({
      message: "User only",
    });
  }

  next();
};
