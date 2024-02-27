import { customPlaceId } from 'src/util/customIdGenerartor';
import { LikesRepository } from './../repository/likes.repository';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class LikesService {
  constructor(private readonly likesRepository: LikesRepository) {}

  async getLikeShopByUser(likesData) {
    console.log(likesData);
    const likeShop = await this.likesRepository.findOneByIds(likesData);

    if (!likeShop) {
      throw new NotFoundException('liked shop is not found.');
    }

    return likeShop;
  }

  async addLikeShop(likeShopData) {
    const likeShop = await this.likesRepository.insertComment(likeShopData);
    const addedLikeByPlaceId = likeShop.identifiers[0];

    if (!addedLikeByPlaceId) {
      throw new BadRequestException('Failed to create post.');
    }
    const result = await this.getLikeShopByUser(addedLikeByPlaceId);

    return result;
  }

  async deletelikeShop(likeShopData) {
    const { affected } = await this.likesRepository.deleteCommentById(
      likeShopData,
    );

    if (!affected) {
      throw new NotFoundException('The requested likes was not found.');
    }

    const result = { message: 'Resource deleted successfully.' };

    return result;
  }
}
