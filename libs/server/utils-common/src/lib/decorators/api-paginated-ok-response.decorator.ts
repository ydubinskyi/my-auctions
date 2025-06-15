import type { Type } from '@nestjs/common';
import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

import { PaginationResponseDto } from '../dtos';

/**
 * @param options
 * @returns
 */
export function ApiPaginatedOkResponse<T extends Type>(options: {
  type: T;
  description?: string;
}): MethodDecorator {
  return applyDecorators(
    ApiExtraModels(PaginationResponseDto),
    ApiExtraModels(options.type),
    ApiOkResponse({
      description: options.description,
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginationResponseDto) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(options.type) },
              },
            },
          },
        ],
      },
    })
  );
}
