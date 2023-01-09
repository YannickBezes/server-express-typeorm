import {NotFoundException} from '~/utils/exceptions';

/**
 * For all other undefined routes, an error is returned
 */
export default () => {
  throw new NotFoundException(`The requested resource does not exist`);
};
