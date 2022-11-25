import {Router} from "express"
import User from "./Users.js"
const router = new Router()

router.get("/users", async (req, res)=> {
    try {
        const users = await User.find({}).sort([["rating", -1]]).exec()
        res.json(users)
    } catch(err) {
        console.log(err)
        res.json({message: "bad request"})
    }
})
router.post("/login", async (req, res)=> {
    try {
        const user = await User.findOne({name: req.body.name})
        if(!user)
            return res.json({message: "пользователь не найден"})
        if(user.password !== req.body.password)
            return res.json({message: "неверный пароль"})
        res.json({user})
    } catch(err) {
        console.log(err)
        res.json({message: "bad request"})
    }
})
router.post("/register", async (req, res)=> {
    try {
        const user = new User({
            name: req.body.name,
            password: req.body.password
        })
        await user.save()
        res.json({user})
    } catch(err) {
        console.log(err)
        res.json({message: "bad request"})
    }
})
router.patch("/game-result", async (req, res)=> {
    try {
        const winner = await User.findOne({_id: req.body.winner})
        const looser = await User.findOne({_id: req.body.looser})
        winner.rating += 25
        looser.rating -= 25
        await winner.save()
        await looser.save()
        res.json({winner, looser})
    } catch(err) {
        console.log(err)
        res.json({message: "bad request"})
    }
})
export {router as mainRouter};