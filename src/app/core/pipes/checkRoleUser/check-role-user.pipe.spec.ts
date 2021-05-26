import { CheckRoleUserPipe } from './check-role-user.pipe';

import {
  currentUserForTest, currentUserForTest1,
  dataOfAllCardForUnitTest,
  dataOfAllCardForUnitTestWithisNoModeration,
} from '../../../shared/constants';
const pipe = new CheckRoleUserPipe();

describe('CheckRoleUserPipe', () => {
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  it('should return card', () => {
    expect(pipe.transform(dataOfAllCardForUnitTest, currentUserForTest1)).toEqual(
      dataOfAllCardForUnitTest
    );
  });
  it('shouldn return card, with isModeration = true', () => {
    expect(
      pipe.transform(dataOfAllCardForUnitTest, currentUserForTest)
    ).toEqual(dataOfAllCardForUnitTest);
  });
  it('shouldn return empty array, because card = []', () => {
    expect(pipe.transform([], currentUserForTest)
    ).toEqual([]);
  });
  it('shouldn return empty array', () => {
    expect(pipe.transform(dataOfAllCardForUnitTestWithisNoModeration, currentUserForTest)).toEqual([]);
  });
});
