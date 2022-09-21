import { MutationTree } from 'vuex'
import { RootState } from './state'

// -----------------------------------------------------------------------------
//
//  Constants
//
// -----------------------------------------------------------------------------

export namespace Mutations {
  // ---------------------------------------------------------------------------
  //
  //  Mutation Types
  //
  // ---------------------------------------------------------------------------

  export const TYPE = {
    SET_CATEGORIES: 'SET_CATEGORIES',
  } as const

  // ---------------------------------------------------------------------------
  //
  //  Mutation Payloads
  //
  // ---------------------------------------------------------------------------

  export namespace Payload {

  }
}

// -----------------------------------------------------------------------------
//
//  Mutation Implements
//
// -----------------------------------------------------------------------------

export default {
  [Mutations.TYPE.SET_CATEGORIES](state: RootState, payload: any) {
    state.categories = payload
  }

} as MutationTree<RootState>
