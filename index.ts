import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const app = express();

app.use(express.json());

const prisma = new PrismaClient();

app.post("/", async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await prisma.user.create({
        data: {
            username: username,
            password: password
        }
    });

    res.json({ user });
});


app.get("/", async (req: Request, res: Response) => {
    const users = await prisma.user.findMany();
    res.json({ users });
});


app.patch("/:id", async (req: Request, res: Response) => {

    const { id } = req.params;
    const { username } = req.body;

    const updateUser = await prisma.user.update({
        where: {
            id: id
        },
        data: {
            username: username
        }
    });

    res.json({ updateUser });

});
app.delete("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    const deletedUser = await prisma.user.delete({
        where: {
            id: id
        }
    });

    res.json({ deletedUser });
});




app.get("/", (req: Request, res: Response) => { });


app.listen(3000, () => {
    console.log("Server running on Port 3000");
});