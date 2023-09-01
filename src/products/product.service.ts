import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { Injectable } from "@nestjs/common";
import { Product, ProductDocument } from './schema/product.schema';
import { Model } from 'mongoose';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
    constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {

    }

    async getAll(): Promise<Product[]> {
        return this.productModel.find().exec()
    }

    async getById(id: string): Promise<Product> {
        return this.productModel.findById(id)
    }

    async create(product: CreateProductDto): Promise<Product> {
        const newProduct = new this.productModel(product)
        return newProduct.save()
    }

    async update(id: string, updateProduct: UpdateProductDto): Promise<Product> {
        return this.productModel.findByIdAndUpdate(id, updateProduct, { new: true })
    }

    async delete(id: string): Promise<Product> {
        return this.productModel.findByIdAndRemove(id)
    }
}