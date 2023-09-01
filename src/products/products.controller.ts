import { Controller, Get, Param, Post, Put, Delete, Body } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ProductsService } from "./product.service";
import { Product } from "./schema/product.schema";

@Controller("products")
export class ProductsController {
    constructor(private readonly productService: ProductsService) {

    }
    @Get()
    getAll(): Promise<Product[]> {
        return this.productService.getAll()
    }

    @Get(":id")
    getOne(@Param("id") id: string): Promise<Product> {
        return this.productService.getById(id)
    }

    @Post()
    create(@Body() createProduct: CreateProductDto): Promise<Product> {
        return this.productService.create(createProduct)
    }

    @Put(":id")
    update(
        @Param("id") id: string,
        @Body() updateProduct: UpdateProductDto
    ): Promise<Product> {
        return this.productService.update(id, updateProduct)
    }

    @Delete(":id")
    delete(@Param("id") id: string): Promise<Product> {
        return this.productService.delete(id)
    }
}
