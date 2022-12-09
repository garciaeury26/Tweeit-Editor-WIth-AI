import {
  ActionIcon,
  Container,
  createStyles,
  Group,
  Text,
} from "@mantine/core";
import { IconBrandTwitter, IconBrandYoutube } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 120,
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl * 2,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  afterFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: theme.spacing.xl,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },

  social: {
    [theme.fn.smallerThan("sm")]: {
      marginTop: theme.spacing.xs,
    },
  },
}));

const Footer = () => {
  const { classes } = useStyles();

  const year = new Date().getFullYear();

  return (
    <footer className={classes.footer}>
      <Container className={classes.afterFooter}>
        <Text color="dimmed" size="sm">
          <>© {year} taishik. All rights reserved.</>
        </Text>

        <Group spacing={0} className={classes.social} position="right" noWrap>
          <ActionIcon
            size="lg"
            component="a"
            href="https://twitter.com/taishik_"
            target="_blank"
          >
            <IconBrandTwitter size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            size="lg"
            component="a"
            href="https://www.youtube.com/@_taishi"
            target="_blank"
          >
            <IconBrandYoutube size={18} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
};

export default Footer;
