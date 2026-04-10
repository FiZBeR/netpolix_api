import { VideoServices } from "../services/video.services.ts";
import { type Request, type Response } from "express";
import { Prisma } from '@prisma/client';

export class VideoController {

    static async findAll (req: Request, res: Response): Promise<void>{
        try {
            
        } catch (error) {
            
        }
    }

    static async findOne (req: Request<{ isan: string }>, res: Response): Promise<void>{
        try {
            
        } catch (error) {
            
        }
    }

    static async create (req: Request, res: Response): Promise<void>{
        try {
            
        } catch (error) {
            
        }
    }

    static async update (req: Request<{ isan: string }>, res: Response): Promise<void>{
        try {
            
        } catch (error) {
            
        }
    }

    static async delete (req: Request<{ isan: string }>, res: Response): Promise<void>{
        try {
            
        } catch (error) {
            
        }
    }
}