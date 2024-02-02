import { PostsRepository } from './../repository/posts.repository';
import { generateCustomId } from 'src/util/customIdGenerartor';
import { Injectable, BadRequestException } from '@nestjs/common';
import * as communityData from '../dummydata/community.json';

@Injectable()
export class CommunityService {
  constructor(private readonly postsRepository: PostsRepository) {}

  async getPosts() {
    const posts = await this.postsRepository.findAllPosts();
    return posts;
  }

  async getPostById(post_id: any) {
    const posts = await this.postsRepository.findOneByIds(post_id);
    return posts;
  }

  async getPostsByUser(account_id: any) {
    const posts = await this.postsRepository.findOneByIds(account_id);
    return posts;
  }

  async createPost(postData: any) {
    const post_id = generateCustomId();
    const post = await this.postsRepository.insertPost({
      post_id,
      ...postData,
    });
    const createdPostId = post.identifiers[0];

    if (!createdPostId) {
      throw new BadRequestException('Failed to create post.');
    }
    const result = await this.getPostById(createdPostId);

    return result;
  }

  async updatePost(postData: any) {
    const post = await this.postsRepository.updatePostById(postData);
    return post;
  }

  async deletePost(postData: any) {
    await this.postsRepository.deletePostById(postData);
    const result = { message: 'Resource deleted successfully.' };
    return result;
  }
}
