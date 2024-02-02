import { generateCustomId } from 'src/util/customIdGenerartor';
import { CommentsRepository } from './../repository/comments.repository';
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: CommentsRepository) {}

  async getCommentById(commentData) {
    const result = await this.commentsRepository.findOneByIds(commentData);
    return result;
  }

  async getCommentByUser(account_id) {
    const result = await this.commentsRepository.findOneByIds(account_id);
    if (!result) {
      throw new NotFoundException('The comment is not found.');
    }
    return result;
  }

  async createComment(commentData) {
    const comment_id = generateCustomId();
    const comment = await this.commentsRepository.insertComment({
      comment_id,
      ...commentData,
    });

    const createdCommentId = comment.identifiers[0];

    if (!createdCommentId) {
      throw new BadRequestException('Failed to create post.');
    }
    const result = await this.getCommentById(createdCommentId);

    return result;
  }

  async editComment() {}

  async deleteComment(commnetData) {
    console.log(commnetData);

    const { affected } = await this.commentsRepository.deleteCommentById(
      commnetData,
    );

    if (!affected) {
      throw new NotFoundException('The requested comment was not found.');
    }

    const result = { message: 'Resource deleted successfully.' };

    return result;
  }
}
