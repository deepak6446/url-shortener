import { Injectable } from '@nestjs/common';

@Injectable()
export class UrlService {
  // Maps original URLs to their shortened codes
  private urlMap: Map<string, string> = new Map();
  
  // Maps shortened codes to their original URLs (duplicate data to make querying faster)
  private codeMap: Map<string, string> = new Map(); 

  // Generates a random code of the specified length using characters from the environment variable
  generateCode(length: number): string {
    const characters = process.env.CHARACTERS;
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  // Shortens the given URL and stores the mapping in both urlMap and codeMap
  shortenUrl(originalUrl: string): string {
    const codeLength = parseInt(process.env.CODE_LENGTH, 10);
    const code = this.generateCode(codeLength);
    this.urlMap.set(originalUrl, code);
    this.codeMap.set(code, originalUrl);
    return `${process.env.BASE_URL}/${code}`;
  }

  // Retrieves the shortened URL for the given original URL
  getShortenedUrl(originalUrl: string): string | undefined {
    const code = this.urlMap.get(originalUrl);
    if (code) {
      return `${process.env.BASE_URL}/${code}`;
    }
    return undefined;
  }

  // Retrieves the original URL for the given shortened code
  getOriginalUrl(code: string): string | undefined {
    const url = this.codeMap.get(code);
    if (url) {
      return url;
    }
    return undefined;
  }
}
