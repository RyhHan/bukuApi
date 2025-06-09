import { Request, Response } from "express";
import Buku from "../models/Buku";

const BukuController = {
    index: async (req:Request, res: Response) => { 
        try {
            const userId = req.query.userId
            const bukus = await Buku.findAll({
                where: {
                    userId: userId //example@example.com
                }
            });
            return res.status(200).json({
                status: 200,
                message: "buku sent successfully",
                bukus: bukus
            })
        } catch (error : any) {
            return res.status(500).json({
                status: 500,
                error: error.message,
                message: "Error fetching bukus",
            })
        }
    },

    show: async (req: Request, res: Response) => {
        try {
            const bukuId = req.params.id;
            const buku = await Buku.findByPk(bukuId);

            if (buku=== null) {
                return res.status(404).json({
                    status: 404,
                    message: "Buku not found",
                })
            }
            return res.status(200).json({
                status: 200,
                message: "Buku found successfully",
                buku: buku
            })
        } catch (error: any) {
            return res.status(500).json({
                status: 500,
                message: "Error fetching buku",
            })
        }
    },

    store: async (req: Request, res: Response) => {
        try {
            if (!req.file) {
                return res.status(400).json({
                    status: 400,
                    message: "Cover image is required"
                });
            }

            const baseUrl = `${req.protocol}://${req.get('host')}`;
            const coverUrl = `${baseUrl}/public/images/${req.file.filename}`;

            const buku = await Buku.create({
                ...req.body,
                coverUrl: coverUrl,
            })

            return res.status(201).json({
                status: 201,
                message: "Buku created successfully",
                buku: buku
            })
        } catch (error: any) {
            return res.status(500).json({
                status: 500,
                message: "Error fetching buku",
                error: error.message
            })
        }
    },

    update: async (req: Request, res: Response) => {
        try {
            const bukuId = req.params.id;
            const buku = await Buku.findByPk(bukuId);
            if (buku == null) {
                return res.status(404).json({
                    status: 404,
                    message: "Buku not found",
                });
            }

            if (req.file) {
                const baseUrl = `${req.protocol}://${req.get('host')}`;
                const coverUrl = `${baseUrl}/public/images/${req.file.filename}`;
                req.body.coverUrl = coverUrl;
            }

            await buku.update(req.body);

            return res.status(200).json({
                status: 200,
                message: "Buku updated successfully",
                buku: buku
            });
        } catch (error: any) {
            return res.status(500).json({
                status: 500,
                message: "Error fetching buku",
                error: error.message
            });
        }
    },

    destroy: async (req: Request, res: Response) => {
        try {
            const bukuId = req.params.id;
            const buku = await Buku.findByPk(bukuId);

            if (buku == null) {
                return res.status(404).json({
                    status: 404,
                    message: "Buku not found",
                });
            }

            await buku.destroy();

            return res.status(200).json({
                status: 200,
                message: "Buku deleted successfully",
            });
        } catch (error: any) {
            return res.status(500).json({
                status: 500,
                message: "Error fetching buku",
                error: error.message
            });
        }
    }
}

export default BukuController;