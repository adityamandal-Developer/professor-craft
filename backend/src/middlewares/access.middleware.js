// module.exports =
//     (...args) =>
//         async (req, res, next) => {
//             // console.log(req)
//             // console.log(req.user.role)
//             // console.log(args)
//             try {
//                 function check(args) {
//                     for (let element of args) {
//                         console.log(element);
//                         if (element === req.user.role) return true;
//                     }
//                     return false;
//                 }
//                 // console.log("checking" + check())
//                 if (check(args)) {
//                     next();
//                     return res.status(201).json({
//                         message: `Access granted to ${req.user._id}`,
//                     });
//                 } else {
//                     return res.status(401).json({ message: "Access denied" });
//                 }
//             } catch (error) {
//                 return res.status(401).json({ message: "Access denied" });
//             }
//         };
module.exports =
    (...arg) =>
        async (req, res, next) => {
            console.log("user" + req.user);
            try {
                function check(arg) {
                    for (let element of arg) {
                        if (req.user.role === element) return true;
                    }
                    return false;
                }
                if (check(arg)) {
                    next();
                } else
                    res
                        .status(401)
                        .json({
                            message: "ops! Access denied",
                        });
            } catch (err) {
                return res.status(401).json({ message: "Something went wrong please contact customer service" });
            }
        };
