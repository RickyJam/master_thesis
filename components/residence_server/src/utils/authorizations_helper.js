export function mergeAllAuthFields(authorizations) {
  return authorizations.reduce(
    (accumulator, currentValue) => [...accumulator, ...currentValue.fields],
    []
  );
}

export function getAuthForHome(authorizations, home) {
  return (
    authorizations.find((auth) => {
      return auth.home === home;
    }) || undefined
  );
}
