import { TestBed } from '@angular/core/testing';

import { ContatosResolverGuard } from './contatos-resolver.guard';

describe('ContatosResolverGuard', () => {
  let guard: ContatosResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ContatosResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
