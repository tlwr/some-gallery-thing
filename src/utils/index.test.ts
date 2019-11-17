import moment from 'moment';

import {truncateEven} from '.';

describe('truncateEven', () => {

  it('should return the empty array when given an empty array', () => {
    expect(truncateEven([]).length).toEqual(0);
  });

  it('should return the empty array when given a one element array', () => {
    expect(truncateEven([1])).toEqual([]);
  });

  it('should return the first two elems when given a 2 element array', () => {
    expect(truncateEven([1, 2])).toEqual([1, 2]);
  });

  it('should return the first two elems when given a 3 element array', () => {
    expect(truncateEven([1, 2, 3])).toEqual([1, 2]);
  });

});
