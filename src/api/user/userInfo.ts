import service from '@/utils/request'
import { AxiosPromise } from 'axios'

export interface GiteeUserInfoModel {
  'id': number
 , 'login': string
 , 'name': string
 , 'avatar_url': string
 , 'url': string
 , 'html_url': string
 , 'followers_url': string
 , 'following_url':string
 , 'gists_url': string
 , 'starred_url': string
 , 'subscriptions_url': string
 , 'organizations_url': string
 , 'repos_url': string
 , 'events_url': string
 , 'received_events_url': string
 , 'type': string
 , 'blog': null
 , 'weibo': null
 , 'bio': null
 , 'public_repos': number
 , 'public_gists': number
 , 'followers': number
 , 'following': number
 , 'stared': number
 , 'watched': number
 , 'created_at': string
 , 'updated_at': string
 , 'email': null

}

export function getGiteeUserInfo (token: string) : AxiosPromise<GiteeUserInfoModel> {
  return service('https://gitee.com/api/v5/user', {
    method: 'GET',
    params: {
      access_token: token
    }
  })
}
