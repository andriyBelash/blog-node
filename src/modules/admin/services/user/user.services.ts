import { Repository } from "typeorm";
import { User } from "../../../shared/entities/user.entity.js";
import { Request, Response } from "express";
import AppDataSource from "../../../../config/database.js";

interface PaginationQuery {
  page?: string;
  per_page?: string;
}

export class UserServices {
  private userRepository: Repository<User>

  constructor() {
    this.userRepository = AppDataSource.getRepository(User)
  }

  async getList(query: PaginationQuery) {
    const page = parseInt(query.page || '1');
    const per_page = parseInt(query.per_page || '10');
    const skip = (page - 1) * per_page;

    const [items, total] = await this.userRepository.findAndCount({
        skip: skip,
        take: per_page,
        order: { id: "ASC" }
    });

    const totalPages = Math.ceil(total / per_page);

    return {
        data: items,
        meta: { total, page, per_page, totalPages }
    };
}
}