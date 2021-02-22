const actions = require("../actions/actions-model")
// const projects = require("../projects/projects-model")

function validateActionID() {
    return (req,res,next) => {
        actions.get(req.params.id)
        .then((action) => {
            if (action) {
                req.action = action
                next()
            } else {
                res.status(404).json({
                    message: "Action not found"
                })
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                message: "Error rerieving action"
            })
        })
    }
}

module.exports= {
    validateActionID,
}