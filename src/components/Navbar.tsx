import { useAppTheme } from '../theme/ThemeProvider';

const Navbar = () => {
  const theme = useAppTheme();

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16, backgroundColor: theme.background }}>
      <Text style={{ fontWeight: 'bold', color: theme.text, fontSize: 20 }}>SavedIt</Text>
      <SaveActionButton />
      <OverflowMenuButton />
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  logo: {
    color: Colors.primary,
    fontSize: 24,
    fontWeight: '700',
  },
});