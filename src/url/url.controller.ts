import { Controller, Post, Get, Body, Res, HttpStatus, Query, Param } from '@nestjs/common';
import { UrlService } from './url.service';
import { Response } from 'express';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  /**
   * Handles the POST request to shorten a URL.
   * Receives a URL from the client and returns a shortened URL.
   * Here, we should use queuing like SQS or Kafka for better scalability and durability.
   * @param url The URL to be shortened.
   * @param res The response object.
   */
  @Post()
  async shortenUrl(@Body('url') url: string, @Res() res: Response): Promise<void> {
    const shortenedUrl = this.urlService.shortenUrl(url);
    res.status(HttpStatus.ACCEPTED).send();
    console.log(`Shortened URL: ${shortenedUrl}`);
  }

  /**
   * Handles the GET request for polling the shortened URL.
   * Receives the original URL as a query parameter and returns the shortened URL if it exists.
   * @param url The original URL to be checked.
   * @param res The response object.
   */
  @Get('/poll')
  async pollUrl(@Query('url') url: string, @Res() res: Response): Promise<void> {
    const shortenedUrl = this.urlService.getShortenedUrl(url);

    if (shortenedUrl) {
      res.status(HttpStatus.OK).json({ shortenedURL: shortenedUrl });
    } else {
      // Return 204 No Content if the URL has not been shortened yet
      res.status(HttpStatus.NO_CONTENT).send();
    }
  }

  /**
   * Handles the GET request to retrieve the original URL from a shortened code.
   * Receives the shortened code as a path parameter and returns the original URL if it exists.
   * @param code The shortened code.
   * @param res The response object.
   */
  @Get('/:code')
  async getOriginalUrl(@Param('code') code: string, @Res() res: Response): Promise<void> {
    const originalUrl = this.urlService.getOriginalUrl(code);

    if (originalUrl) {
      res.status(HttpStatus.OK).json({ url: originalUrl });
    } else {
      // Return 404 Not Found if the code does not correspond to any original URL
      res.status(HttpStatus.NOT_FOUND).send();
    }
  }
}
