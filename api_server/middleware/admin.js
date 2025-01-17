const adminRequired = (req, res, next) => {
    const user = req.user; // 假设解码后的用户信息存储在 req.user 中
 
    console.log("user is admin", user)
    if (!user || user.id != 1) {
      return res.status(403).json({ error: 'Access denied' });
    }
    next(); // 如果验证通过，继续执行后续的路由处理器
  };
  
export default adminRequired;