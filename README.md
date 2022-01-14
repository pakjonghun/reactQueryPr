## React Query - Udemy Lec

## Basic usage

### query

### mutation

### keepPreviousData

isLoading이 보기 싫을때 설정한다. 프리패치와 같이 사용하면 시간절감효과도 있다.
프리패치와 같이 안쓰면 시간은 오래 걸리지만 로딩은 안뜬다.

### useQueryClient.preFetch

미리 프리패칭 한다. 콜백 함수를 넣어서 쿼리를 미리 실행 시키며, 쿼리 키가 미리 가져올 데이터와 같아야 한다.

```
useEffect(() => {
    if (currentPage < maxPostPage || currentPage > 1) {
      const next = currentPage + 1;
      queryClient.prefetchQuery(["posts", next], () => fetchPosts(next));
    }
  }, [currentPage, queryClient]);
```

### stale time

데이터가 최신 정보인 시간 그냥 정하는대로 된다.(fresh data)

### cache time

before expire in cache (after inactive)

### isLoading

가져오는 중이고, 혹은 처리중이고(not resolved) && 캐쉬에도 없음

### isFetching

쿼리에서 가져오는 중(not resolved)
